package com.pas.drug.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pas.drug.model.Drug;
import com.pas.drug.repository.DrugRepository;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/pas")
public class DrugController {

    @Autowired
    private DrugRepository drugRepository;

    @GetMapping("/all")
    public ResponseEntity<List<Drug>> getAllDrugs() {
        List<Drug> drugs = drugRepository.findAll();
        return new ResponseEntity<>(drugs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Drug> getDrugById(@PathVariable("id") long id) {
        Optional<Drug> drugData = drugRepository.findById(id);
        return drugData.map(drug -> new ResponseEntity<>(drug, HttpStatus.OK))
                       .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
    


    @PostMapping("/addDrugs")
    public ResponseEntity<Drug> createDrug(@RequestBody Drug drug) {
        try {
            Drug _drug = drugRepository.save(drug);
            return new ResponseEntity<>(_drug, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Drug> updateDrug(@PathVariable("id") long id, @RequestBody Drug drug) {
        Optional<Drug> drugData = drugRepository.findById(id);

        if (drugData.isPresent()) {
            Drug _drug = drugData.get();
            _drug.setDescription(drug.getDescription());
            _drug.setName(drug.getName());
            _drug.setPrice(drug.getPrice());
            _drug.setSupplierName(drug.getSupplierName());
            _drug.setTotalQuantity(drug.getTotalQuantity());
            return new ResponseEntity<>(drugRepository.save(_drug), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteDrug(@PathVariable("id") long id) {
        try {
            drugRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/deleteAll")
    public ResponseEntity<HttpStatus> deleteAllDrugs() {
        try {
            drugRepository.deleteAll();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
